package net.javaguides.springboot.repository;

import net.javaguides.springboot.model.Livre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LivreRepository extends JpaRepository<Livre, Integer> {
    //ALL CRUD OPERATIONS METHODS
}
