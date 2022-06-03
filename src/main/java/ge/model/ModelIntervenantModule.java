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
@Table(name = "intervenant_module")
public class ModelIntervenantModule {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_intervenant_module")
	@SequenceGenerator(name = "generator_intervenant_module", sequenceName = "_seq_intervenant_module")
	private Long idIntervenantModule;
	@ManyToOne
	@JoinColumn(name = "id_personne", nullable = false)
	private ModelPersonne personne;
	@ManyToOne
	@JoinColumn(name = "id_module", nullable = false)
	private ModelModule module;
	@ManyToOne
	@JoinColumn(name = "id_campus", nullable = false)
	private ModelCampus campus;
	private Date dateDebutIntervenention;
	private Date dateFinIntervenention;
	
	public ModelIntervenantModule() {
		super();
	}

	public ModelIntervenantModule(Long idIntervenantModule, ModelPersonne personne, ModelModule module, ModelCampus campus, Date dateDebutIntervenention, Date dateFinIntervenention) {
		super();
		this.idIntervenantModule = idIntervenantModule;
		this.personne = personne;
		this.module = module;
		this.campus = campus;
		this.dateDebutIntervenention = dateDebutIntervenention;
		this.dateFinIntervenention = dateFinIntervenention;
	}

	public Long getIdIntervenantModule() {
		return idIntervenantModule;
	}

	public void setIdIntervenantModule(Long idIntervenantModule) {
		this.idIntervenantModule = idIntervenantModule;
	}

	public ModelPersonne getPersonne() {
		return personne;
	}

	public void setPersonne(ModelPersonne personne) {
		this.personne = personne;
	}

	public ModelModule getModule() {
		return module;
	}

	public void setModule(ModelModule module) {
		this.module = module;
	}

	public ModelCampus getCampus() {
		return campus;
	}

	public void setCampus(ModelCampus campus) {
		this.campus = campus;
	}

	public Date getDateDebutIntervenention() {
		return dateDebutIntervenention;
	}

	public void setDateDebutIntervenention(Date dateDebutIntervenention) {
		this.dateDebutIntervenention = dateDebutIntervenention;
	}

	public Date getDateFinIntervenention() {
		return dateFinIntervenention;
	}

	public void setDateFinIntervenention(Date dateFinIntervenention) {
		this.dateFinIntervenention = dateFinIntervenention;
	}
	
}
