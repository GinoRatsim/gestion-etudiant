package ge.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "sct_etudiant")
public class ModelSctEtudiant {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_sct_etudiant")
	@SequenceGenerator(name = "generator_sct_etudiant", sequenceName = "_seq_sct_etudiant")
	private Long idSctEtudiant;
	
	@ManyToOne
	@JoinColumn(name = "id_etudiant", nullable = false)
	private ModelEtudiant etudiant;
	
	@ManyToOne
	@JoinColumn(name = "id_type_sct", nullable = false)
	private ModelTypeSct typeSct;
	
	@ManyToOne
	@JoinColumn(name = "id_annee_scolaire", nullable = false)
	private ModelAnneeScolaire anneeScolaire;
	
	private int valideCertification;

	public ModelSctEtudiant() {
		super();
	}

	public ModelSctEtudiant(Long idSctEtudiant, ModelEtudiant etudiant, ModelTypeSct typeSct, ModelAnneeScolaire anneeScolaire, int valideCertification) {
		super();
		this.idSctEtudiant = idSctEtudiant;
		this.etudiant = etudiant;
		this.typeSct = typeSct;
		this.anneeScolaire = anneeScolaire;
		this.valideCertification = valideCertification;
	}

	public Long getIdSctEtudiant() {
		return idSctEtudiant;
	}

	public void setIdSctEtudiant(Long idSctEtudiant) {
		this.idSctEtudiant = idSctEtudiant;
	}

	public ModelEtudiant getEtudiant() {
		return etudiant;
	}

	public void setEtudiant(ModelEtudiant etudiant) {
		this.etudiant = etudiant;
	}

	public ModelTypeSct getTypeSct() {
		return typeSct;
	}

	public void setTypeSct(ModelTypeSct typeSct) {
		this.typeSct = typeSct;
	}

	public ModelAnneeScolaire getAnneeScolaire() {
		return anneeScolaire;
	}

	public void setAnneeScolaire(ModelAnneeScolaire anneeScolaire) {
		this.anneeScolaire = anneeScolaire;
	}

	public int getValideCertification() {
		return valideCertification;
	}

	public void setValideCertification(int valideCertification) {
		this.valideCertification = valideCertification;
	}
		
}
