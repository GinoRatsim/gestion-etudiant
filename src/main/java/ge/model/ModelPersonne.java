package ge.model;

import java.sql.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "personne")
public class ModelPersonne {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_personne")
	@SequenceGenerator(name = "generator_personne", sequenceName = "_seq_personne")
	private Long idPersonne;
	private String identifiant;
	private char sexe;
	private String nom;
	private String nomUsage;
	private String prenoms;
	private Date dateNaissance;
	
	@OneToMany(mappedBy = "personne", cascade = CascadeType.REMOVE)
	private Set<ModelPersonne> personne;
	
	public ModelPersonne() {
		super();
	}
	
	public ModelPersonne(Long idPersonne, String identifiant, char sexe, String nom, String nomUsage, String prenoms, Date dateNaissance) {
		super();
		this.idPersonne = idPersonne;
		this.identifiant = identifiant;
		this.sexe = sexe;
		this.nom = nom;
		this.nomUsage = nomUsage;
		this.prenoms = prenoms;
		this.dateNaissance = dateNaissance;
	}

	public Long getIdPersonne() {
		return idPersonne;
	}

	public void setIdPersonne(Long idPersonne) {
		this.idPersonne = idPersonne;
	}

	public String getIdentifiant() {
		return identifiant;
	}

	public void setIdentifiant(String identifiant) {
		this.identifiant = identifiant;
	}

	public char getSexe() {
		return sexe;
	}

	public void setSexe(char sexe) {
		this.sexe = sexe;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getNomUsage() {
		return nomUsage;
	}

	public void setNomUsage(String nomUsage) {
		this.nomUsage = nomUsage;
	}

	public String getPrenoms() {
		return prenoms;
	}

	public void setPrenoms(String prenoms) {
		this.prenoms = prenoms;
	}

	public Date getDateNaissance() {
		return dateNaissance;
	}

	public void setDateNaissance(Date dateNaissance) {
		this.dateNaissance = dateNaissance;
	}
	
}
