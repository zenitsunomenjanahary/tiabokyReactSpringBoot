package net.javaguides.springboot.controller;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Lecteur;
import net.javaguides.springboot.model.Livre;
import net.javaguides.springboot.model.Pret;
import net.javaguides.springboot.repository.LecteurRepository;
import net.javaguides.springboot.repository.LivreRepository;
import net.javaguides.springboot.repository.PretRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.lang.System.exit;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/prets")
public class PretController {
    @Autowired
    private PretRepository pretRepository;

    @Autowired
    private LivreRepository livreRepository;

    @Autowired
    private LecteurRepository lecteurRepository;

    @GetMapping
    public List<Pret> getAllPret() { return pretRepository.findAll();}

    @GetMapping("{id}")
    public ResponseEntity<Pret> getPretById(@PathVariable int id){
        Pret pret = pretRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Pret inexistant"));
        return ResponseEntity.ok(pret);
    }

    @PostMapping
    public ResponseEntity<Pret> createPret(@RequestBody Pret pret) {
        //Verifier si le lecteur a atteint le nombre maximal de pret
        Lecteur lecteur = lecteurRepository.findById(pret.getNumeroLecteur())
                .orElseThrow(()-> new ResourceNotFoundException("Lecteur inexistant"));

        if(lecteur.getPretActuel() == 3){
            throw new ResourceNotFoundException("Le lecteur a deja atteint le nombre de pret maximal");
        }

        Livre livre = livreRepository.findById(pret.getNumeroLivre())
                .orElseThrow(()-> new ResourceNotFoundException("Livre inexistant"));

        lecteur.setPretActuel(lecteur.getPretActuel() + 1);
        lecteurRepository.save(lecteur);

        livre.setDisponible(false);
        livreRepository.save(livre);

        pretRepository.save(pret);

        return ResponseEntity.ok(pret);

    }

    @PutMapping("{id}")
    public ResponseEntity<Pret> deliverPret(@PathVariable int id){
        Pret pret = pretRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Pret inexistant"));

        //Mise a jour livre
        Livre livre = livreRepository.findById(pret.getNumeroLivre()).orElseThrow(()-> new ResourceNotFoundException("Livre inexistant"));
        livre.setDisponible(true);
        livre.setNbPret(livre.getNbPret()+1);
        livreRepository.save(livre);

        //Mise a jour lecteur
        Lecteur lecteur = lecteurRepository.findById(pret.getNumeroLecteur()).orElseThrow(()-> new ResourceNotFoundException("Lecteur inexistant"));
        lecteur.setPretActuel(lecteur.getPretActuel()-1);
        lecteurRepository.save(lecteur);

        pret.setRendu(true);
        pretRepository.save(pret);
        return ResponseEntity.ok(pret);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deletePret(@PathVariable int id){
        Pret pret = pretRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Pret inexistant"));

        //Mise a jour livre
        Livre livre = livreRepository.findById(pret.getNumeroLivre()).orElseThrow(()-> new ResourceNotFoundException("Livre inexistant"));
        livre.setDisponible(true);
        livreRepository.save(livre);

        //Mise a jour lecteur
        Lecteur lecteur = lecteurRepository.findById(pret.getNumeroLecteur()).orElseThrow(()-> new ResourceNotFoundException("Lecteur inexistant"));
        lecteur.setPretActuel(lecteur.getPretActuel()-1);
        lecteurRepository.save(lecteur);

        pretRepository.delete(pret);
        return new ResponseEntity<HttpStatus>(HttpStatus.NO_CONTENT);
    }
}
