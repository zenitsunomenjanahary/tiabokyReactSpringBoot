package net.javaguides.springboot.controller;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Livre;
import net.javaguides.springboot.repository.LivreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/livres")
public class LivreController {

    @Autowired
    private LivreRepository livreRepository;

    @GetMapping
    public List<Livre> getAllLivre(){ return livreRepository.findAll();}

    @GetMapping("{id}")
    public ResponseEntity <Livre> getLivreById(@PathVariable int id){
        Livre livre = livreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Livre inexistant"));

        return ResponseEntity.ok(livre);
    }

    @PostMapping
    public Livre createLivre(@RequestBody Livre livre){
        livre.setDisponible(true);
        return livreRepository.save(livre);}

    @PutMapping("{id}")
    public ResponseEntity<Livre> updateLivre(@PathVariable int id,@RequestBody Livre livreDetails){
        Livre updateLivre = livreRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Livre inexistant"));

        updateLivre.setTitre(livreDetails.getTitre());
        updateLivre.setAutheur(livreDetails.getAutheur());
        updateLivre.setEdition(livreDetails.getEdition());

        livreRepository.save(updateLivre);

        return ResponseEntity.ok(updateLivre);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteLivre(@PathVariable int id){
        Livre livre = livreRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Livre inexistant"));
        livreRepository.delete(livre);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
