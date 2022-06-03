package ge.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "administratif_etudiant")
public class ModelAdministratifEtudiant {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_administratif_etudiant")
	@SequenceGenerator(name = "generator_administratif_etudiant", sequenceName = "_seq_administratif_etudiant")
	private Long idAdministratifEtudiant;
	@ManyToOne
	@JoinColumn(name = "id_personne", nullable = false)
	private ModelPersonne personne;
	private int niveauEntree;
	private int niveauSortie;
	private Date anneeEntree;
	private Date anneeSortie;
	
	
	public ModelAdministratifEtudiant() {
		super();
	}
	
	public ModelAdministratifEtudiant(Long idAdministratifEtudiant, ModelPersonne personne, int niveauEntree, int niveauSortie, Date anneeEntree, Date anneeSortie) {
		super();
		this.idAdministratifEtudiant = idAdministratifEtudiant;
		this.personne = personne;
		this.niveauEntree = niveauEntree;
		this.niveauSortie = niveauSortie;
		this.anneeEntree = anneeEntree;
		this.anneeSortie = anneeSortie;
	}
	
	public Long getIdAdministratifEtudiant() {
		return idAdministratifEtudiant;
	}
	
	public void setIdAdministratifEtudiant(Long idAdministratifEtudiant) {
		this.idAdministratifEtudiant = idAdministratifEtudiant;
	}
	
	public ModelPersonne getPersonne() {
		return personne;
	}
	
	public void setPersonne(ModelPersonne personne) {
		this.personne = personne;
	}
	
	public int getNiveauEntree() {
		return niveauEntree;
	}
	
	public void setNiveauEntree(int niveauEntree) {
		this.niveauEntree = niveauEntree;
	}
	public int getNiveauSortie() {
		return niveauSortie;
	}
	
	public void setNiveauSortie(int niveauSortie) {
		this.niveauSortie = niveauSortie;
	}
	
	public Date getAnneeEntree() {
		return anneeEntree;
	}
	
	public void setAnneeEntree(Date anneeEntree) {
		this.anneeEntree = anneeEntree;
	}
	
	public Date getAnneeSortie() {
		return anneeSortie;
	}
	
	public void setAnneeSortie(Date anneeSortie) {
		this.anneeSortie = anneeSortie;
	}
	
}
