package ge.model;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import ge.model.ModelEtudiant;

@Entity
@Table(name = "etudiant")
public class ModelEtudiant {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_etudiant")
	@SequenceGenerator(name = "generator_etudiant", sequenceName = "_seq_etudiant")
	private Long idEtudiant;
	@ManyToOne
	@JoinColumn(name = "id_contrat", nullable = false)
	private ModelContrat contrat;
	@ManyToOne
	@JoinColumn(name = "id_personne", nullable = false)
	private ModelPersonne personne;
	@ManyToOne
	@JoinColumn(name = "id_niveau", nullable = false)
	private ModelNiveau niveau;
	@ManyToOne
	@JoinColumn(name = "id_specialite", nullable = false)
	private ModelSpecialite specialite;
	@ManyToOne
	@JoinColumn(name = "id_type_formation", nullable = false)
	private ModelTypeFormation typeFormation;
	private Date debutAnneeScolaire;
	private Date finAnneeScolaire;
	private double creditTotalObtenus;
	private int actuel;
	
	@OneToMany(mappedBy = "etudiant", cascade = CascadeType.REMOVE)
	private Set<ModelEtudiant> etudiant;
	
	public ModelEtudiant() {
		super();
	}

	public ModelEtudiant(Long idEtudiant, ModelContrat contrat, ModelPersonne personne, ModelNiveau niveau, ModelSpecialite specialite, ModelTypeFormation typeFormation, Date debutAnneeScolaire, Date finAnneeScolaire, double creditTotalObtenus, int actuel) {
		super();
		this.idEtudiant = idEtudiant;
		this.contrat = contrat;
		this.personne = personne;
		this.niveau = niveau;
		this.specialite = specialite;
		this.typeFormation = typeFormation;
		this.debutAnneeScolaire = debutAnneeScolaire;
		this.finAnneeScolaire = finAnneeScolaire;
		this.creditTotalObtenus = creditTotalObtenus;
		this.actuel = actuel;
	}

	public Long getIdEtudiant() {
		return idEtudiant;
	}

	public void setIdEtudiant(Long idEtudiant) {
		this.idEtudiant = idEtudiant;
	}

	public ModelContrat getContrat() {
		return contrat;
	}

	public void setContrat(ModelContrat contrat) {
		this.contrat = contrat;
	}

	public ModelPersonne getPersonne() {
		return personne;
	}

	public void setPersonne(ModelPersonne personne) {
		this.personne = personne;
	}

	public ModelNiveau getNiveau() {
		return niveau;
	}

	public void setNiveau(ModelNiveau niveau) {
		this.niveau = niveau;
	}

	public ModelSpecialite getSpecialite() {
		return specialite;
	}

	public void setSpecialite(ModelSpecialite specialite) {
		this.specialite = specialite;
	}

	public ModelTypeFormation getTypeFormation() {
		return typeFormation;
	}

	public void setTypeFormation(ModelTypeFormation typeFormation) {
		this.typeFormation = typeFormation;
	}

	public Date getDebutAnneeScolaire() {
		return debutAnneeScolaire;
	}

	public void setDebutAnneeScolaire(Date debutAnneeScolaire) {
		this.debutAnneeScolaire = debutAnneeScolaire;
	}

	public Date getFinAnneeScolaire() {
		return finAnneeScolaire;
	}

	public void setFinAnneeScolaire(Date finAnneeScolaire) {
		this.finAnneeScolaire = finAnneeScolaire;
	}

	public double getCreditTotalObtenus() {
		return creditTotalObtenus;
	}

	public void setCreditTotalObtenus(double creditTotalObtenus) {
		this.creditTotalObtenus = creditTotalObtenus;
	}

	public int getActuel() {
		return actuel;
	}

	public void setActuel(int actuel) {
		this.actuel = actuel;
	}
	
}
