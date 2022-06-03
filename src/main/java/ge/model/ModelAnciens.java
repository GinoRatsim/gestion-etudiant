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
@Table(name = "anciens")
public class ModelAnciens {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_anciens")
	@SequenceGenerator(name = "generator_anciens", sequenceName = "_seq_anciens")
	private Long idAnciens;
	@ManyToOne
	@JoinColumn(name = "id_etudiant", nullable = false)
	private ModelEtudiant etudiant;
	@ManyToOne
	@JoinColumn(name = "id_entreprise", nullable = false)
	private ModelEntreprise entreprise;
	@ManyToOne
	@JoinColumn(name = "id_type_contrat", nullable = false)
	private ModelTypeContrat typeContrat;
	private Date dateDebut;
	private Date dateObtentionDiplome;
	
	public ModelAnciens() {
		super();
	}

	public ModelAnciens(Long idAnciens, ModelEtudiant etudiant, ModelEntreprise entreprise, ModelTypeContrat typeContrat, Date dateDebut, Date dateObtentionDiplome) {
		super();
		this.idAnciens = idAnciens;
		this.etudiant = etudiant;
		this.entreprise = entreprise;
		this.typeContrat = typeContrat;
		this.dateDebut = dateDebut;
		this.dateObtentionDiplome = dateObtentionDiplome;
	}

	public Long getIdAnciens() {
		return idAnciens;
	}

	public void setIdAnciens(Long idAnciens) {
		this.idAnciens = idAnciens;
	}

	public ModelEtudiant getEtudiant() {
		return etudiant;
	}

	public void setEtudiant(ModelEtudiant etudiant) {
		this.etudiant = etudiant;
	}

	public ModelEntreprise getEntreprise() {
		return entreprise;
	}

	public void setEntreprise(ModelEntreprise entreprise) {
		this.entreprise = entreprise;
	}

	public ModelTypeContrat getTypeContrat() {
		return typeContrat;
	}

	public void setTypeContrat(ModelTypeContrat typeContrat) {
		this.typeContrat = typeContrat;
	}

	public Date getDateDebut() {
		return dateDebut;
	}

	public void setDateDebut(Date dateDebut) {
		this.dateDebut = dateDebut;
	}

	public Date getDateObtentionDiplome() {
		return dateObtentionDiplome;
	}

	public void setDateObtentionDiplome(Date dateObtentionDiplome) {
		this.dateObtentionDiplome = dateObtentionDiplome;
	}
	
}
