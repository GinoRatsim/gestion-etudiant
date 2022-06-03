package ge.model;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "personne_intervenant")
public class ModelPersonneIntervenant {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_personne_intervenant")
	@SequenceGenerator(name = "generator_personne_intervenant", sequenceName = "_seq_personne_intervenant")
	private Long idPersonneIntervenant;
	@ManyToOne
	@JoinColumn(name = "id_personne", nullable = false)
	private ModelPersonne personne;
	@ManyToOne
	@JoinColumn(name = "id_intervenant", nullable = false)
	private ModelIntervenant intervenant;
	@ManyToOne
	@JoinColumn(name = "id_campus", nullable = false)
	private ModelCampus campus;
	private Date dateDebutSituation;
	private Date dateFinSituation;
	private Date dateDerniereModification;
	private int utilisateurModif;
	
	public ModelPersonneIntervenant() {
		super();
	}

	public ModelPersonneIntervenant(Long idPersonneIntervenant, ModelPersonne personne, ModelIntervenant intervenant, ModelCampus campus, Date dateDebutSituation, Date dateFinSituation, Date dateDerniereModification, int utilisateurModif) {
		super();
		this.idPersonneIntervenant = idPersonneIntervenant;
		this.personne = personne;
		this.intervenant = intervenant;
		this.campus = campus;
		this.dateDebutSituation = dateDebutSituation;
		this.dateFinSituation = dateFinSituation;
		this.dateDerniereModification = dateDerniereModification;
		this.utilisateurModif = utilisateurModif;
	}

	public Long getIdPersonneIntervenant() {
		return idPersonneIntervenant;
	}

	public void setIdPersonneIntervenant(Long idPersonneIntervenant) {
		this.idPersonneIntervenant = idPersonneIntervenant;
	}

	public ModelPersonne getPersonne() {
		return personne;
	}

	public void setPersonne(ModelPersonne personne) {
		this.personne = personne;
	}

	public ModelIntervenant getIntervenant() {
		return intervenant;
	}

	public void setIntervenant(ModelIntervenant intervenant) {
		this.intervenant = intervenant;
	}

	public ModelCampus getCampus() {
		return campus;
	}

	public void setIdCampus(ModelCampus campus) {
		this.campus = campus;
	}

	public Date getDateDebutSituation() {
		return dateDebutSituation;
	}

	public void setDateDebutSituation(Date dateDebutSituation) {
		this.dateDebutSituation = dateDebutSituation;
	}

	public Date getDateFinSituation() {
		return dateFinSituation;
	}

	public void setDateFinSituation(Date dateFinSituation) {
		this.dateFinSituation = dateFinSituation;
	}

	public Date getDateDerniereModification() {
		return dateDerniereModification;
	}

	public void setDateDerniereModification(Date dateDerniereModification) {
		this.dateDerniereModification = dateDerniereModification;
	}

	public int getUtilisateurModif() {
		return utilisateurModif;
	}

	public void setUtilisateurModif(int utilisateurModif) {
		this.utilisateurModif = utilisateurModif;
	}
	
}
