package net.javaguides.springboot.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name= "prets")
public class Pret {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name ="numeroLivre", nullable = false)
    private int numeroLivre;//Tableau id livre

    @Column(name= "numeroLecteur", nullable = false)
    private int numeroLecteur;

    @Column(name= "datePret", nullable = false)
    private String datePret;

    @Column(name="dateRetour",nullable = false)
    private String dateRetour;

    @Column(name="rendu")
    private Boolean rendu;
}
