package net.javaguides.springboot.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "livres")
public class Livre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name ="titre", nullable = false)
    private String titre;

    @Column(name="autheur", nullable = false)
    private String autheur;

    @Column(name ="edition", nullable = false)
    private String edition;

    @Column(name="disponible")
    private Boolean disponible;

    @Column(name= "nbPret")
    private int nbPret;

    @Column(name="illustration")
    private String illustration;
}
