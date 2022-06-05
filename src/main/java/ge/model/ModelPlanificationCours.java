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
@Table(name = "planification_cours")
public class ModelPlanificationCours {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_planification_cours")
	@SequenceGenerator(name = "generator_planification_cours", sequenceName = "_seq_planification_cours")
	private Long idPlanification;
	@ManyToOne
	@JoinColumn(name = "id_module", nullable = false)
	private ModelModule module;
	private Date dateHeureDebutPlanification;
	private Date dateHeureFinPlanification;
	private int estConfirme;
	@ManyToOne
	@JoinColumn(name = "id_type_planification", nullable = false)
	private ModelTypePlanification typePlanification;
	
	public ModelPlanificationCours() {
		super();
	}
	
	public ModelPlanificationCours(Long idPlanification, ModelModule module, Date dateHeureDebutPlanification, Date dateHeureFinPlanification, int estConfirme, ModelTypePlanification typePlanification) {
		super();
		this.idPlanification = idPlanification;
		this.module = module;
		this.dateHeureDebutPlanification = dateHeureDebutPlanification;
		this.dateHeureFinPlanification = dateHeureFinPlanification;
		this.estConfirme = estConfirme;
		this.typePlanification = typePlanification;
	}

	public Long getIdPlanification() {
		return idPlanification;
	}

	public void setIdPlanification(Long idPlanification) {
		this.idPlanification = idPlanification;
	}

	public ModelModule getModule() {
		return module;
	}

	public void setModule(ModelModule module) {
		this.module = module;
	}

	public Date getDateHeureDebutPlanification() {
		return dateHeureDebutPlanification;
	}

	public void setDateHeureDebutPlanification(Date dateHeureDebutPlanification) {
		this.dateHeureDebutPlanification = dateHeureDebutPlanification;
	}

	public Date getDateHeureFinPlanification() {
		return dateHeureFinPlanification;
	}

	public void setDateHeureFinPlanification(Date dateHeureFinPlanification) {
		this.dateHeureFinPlanification = dateHeureFinPlanification;
	}

	public int getEstConfirme() {
		return estConfirme;
	}

	public void setEstConfirme(int estConfirme) {
		this.estConfirme = estConfirme;
	}

	public ModelTypePlanification getTypePlanification() {
		return typePlanification;
	}

	public void setTypePlanification(ModelTypePlanification typePlanification) {
		this.typePlanification = typePlanification;
	}
	
}
