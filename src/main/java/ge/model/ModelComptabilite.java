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
@Table(name = "comptabilite")
public class ModelComptabilite {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_comptabilite")
	@SequenceGenerator(name = "generator_comptabilite", sequenceName = "_seq_comptabilite")
	private Long idComptabilite;
	@ManyToOne
	@JoinColumn(name = "id_etudiant", nullable = false)
	private ModelEtudiant etudiant;
	private String comptaPaieType;
	private int estTotalementPayer;
	private double comptaPayementDue;
	private int comptaRelance;
	
	public ModelComptabilite() {
		super();
	}
	
	public ModelComptabilite(Long idComptabilite, ModelEtudiant etudiant, String comptaPaieType, int estTotalementPayer, double comptaPayementDue, int comptaRelance) {
		super();
		this.idComptabilite = idComptabilite;
		this.etudiant = etudiant;
		this.comptaPaieType = comptaPaieType;
		this.estTotalementPayer = estTotalementPayer;
		this.comptaPayementDue = comptaPayementDue;
		this.comptaRelance = comptaRelance;
	}

	public Long getIdComptabilite() {
		return idComptabilite;
	}

	public void setIdComptabilite(Long idComptabilite) {
		this.idComptabilite = idComptabilite;
	}

	public ModelEtudiant getEtudiant() {
		return etudiant;
	}

	public void setEtudiant(ModelEtudiant etudiant) {
		this.etudiant = etudiant;
	}

	public String getComptaPaieType() {
		return comptaPaieType;
	}

	public void setComptaPaieType(String comptaPaieType) {
		this.comptaPaieType = comptaPaieType;
	}

	public int getEstTotalementPayer() {
		return estTotalementPayer;
	}

	public void setEstTotalementPayer(int estTotalementPayer) {
		this.estTotalementPayer = estTotalementPayer;
	}

	public double getComptaPayementDue() {
		return comptaPayementDue;
	}

	public void setComptaPayementDue(double comptaPayementDue) {
		this.comptaPayementDue = comptaPayementDue;
	}

	public int getComptaRelance() {
		return comptaRelance;
	}

	public void setComptaRelance(int comptaRelance) {
		this.comptaRelance = comptaRelance;
	}
		
}
