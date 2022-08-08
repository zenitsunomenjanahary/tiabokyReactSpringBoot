package net.javaguides.springboot;

import net.javaguides.springboot.controller.LecteurController;
import net.javaguides.springboot.model.Lecteur;
import net.javaguides.springboot.model.Livre;
import net.javaguides.springboot.repository.LecteurRepository;
import net.javaguides.springboot.repository.LivreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;

@SpringBootApplication
public class SpringbootBackendApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(SpringbootBackendApplication.class, args);
	}

	@Autowired
	private LecteurRepository lecteurRepository;

	@Autowired
	LivreRepository livreRepository;

	@Override
	public void run(String... args) throws Exception {

	}
}
