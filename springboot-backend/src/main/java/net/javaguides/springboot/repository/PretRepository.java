package net.javaguides.springboot.repository;

import net.javaguides.springboot.model.Pret;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PretRepository extends JpaRepository<Pret,Integer> {
    //All CRUD Database records
}
