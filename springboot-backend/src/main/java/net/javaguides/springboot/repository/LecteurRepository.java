package net.javaguides.springboot.repository;

import net.javaguides.springboot.model.Lecteur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LecteurRepository extends JpaRepository<Lecteur,Integer > {
    //ALL CRUD DATABASE METHODS
}
