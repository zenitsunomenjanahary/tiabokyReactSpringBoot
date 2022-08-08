package net.javaguides.springboot.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "lecteurs")
public class Lecteur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nom",nullable = false)
    private String nom;

    @Column(name = "prenom", nullable = false)
    private String prenom;

    @Column(name= "adresse", nullable = false)
    private String adresse;

    @Column(name = "tel", nullable = false)
    private String tel;

    @Column(name= "naissance", nullable = false)
    private String naissance;

    @Column(name = "pretActuel")
    private int pretActuel; // 3

    @Column(name = "livres")
    private String [] livres;
}
