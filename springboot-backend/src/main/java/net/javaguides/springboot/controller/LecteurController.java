package net.javaguides.springboot.controller;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Lecteur;
import net.javaguides.springboot.repository.LecteurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/lecteurs")
public class LecteurController {

    @Autowired
    private LecteurRepository lecteurRepository;

    public static String uploadDirectory = System.getProperty("user.dir") + "/src/main/resources/static/images";

    @GetMapping
    public List<Lecteur> getAllLecteur(){
        return lecteurRepository.findAll();
    }

    @GetMapping("{id}")
    public ResponseEntity <Lecteur> getLecteurById(@PathVariable int id){
        Lecteur lecteur = lecteurRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Lecteur inexistant"));
        return ResponseEntity.ok(lecteur);
    }

    @PostMapping
    public Lecteur createLecteur(@RequestBody Lecteur lecteur) {
        return lecteurRepository.save(lecteur);
    }

    @PutMapping("{id}")
    public ResponseEntity<Lecteur> updateLecteur(@PathVariable int id, @RequestBody Lecteur lecteurDetails){
        Lecteur updateLecteur = lecteurRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Lecteur inexistant"));

        updateLecteur.setNom(lecteurDetails.getNom());
        updateLecteur.setPrenom(lecteurDetails.getPrenom());
        updateLecteur.setAdresse(lecteurDetails.getAdresse());
        updateLecteur.setTel(lecteurDetails.getTel());
        updateLecteur.setNaissance(lecteurDetails.getNaissance());

        lecteurRepository.save(updateLecteur);
        return ResponseEntity.ok(updateLecteur);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteLecteur(@PathVariable int id){
        Lecteur lecteur = lecteurRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Lecteur inexistant"));
        lecteurRepository.delete(lecteur);

        return new ResponseEntity<HttpStatus>(HttpStatus.NO_CONTENT);
    }

}
