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

@Entity
@Table(name = "projet")
public class ModelProjet {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_projet")
	@SequenceGenerator(name = "generator_projet", sequenceName = "_seq_projet")
	private Long idProjet;
	private Date dateLimite;
	private Date dateSoutenance;
	@ManyToOne
	@JoinColumn(name = "id_module", nullable = false)
	private ModelModule module;
	
	public ModelProjet() {
		super();
	}

	public ModelProjet(Long idProjet, Date dateLimite, Date dateSoutenance, ModelModule module) {
		super();
		this.idProjet = idProjet;
		this.dateLimite = dateLimite;
		this.dateSoutenance = dateSoutenance;
		this.module = module;
	}

	public Long getIdProjet() {
		return idProjet;
	}

	public void setIdProjet(Long idProjet) {
		this.idProjet = idProjet;
	}

	public Date getDateLimite() {
		return dateLimite;
	}

	public void setDateLimite(Date dateLimite) {
		this.dateLimite = dateLimite;
	}

	public Date getDateSoutenance() {
		return dateSoutenance;
	}

	public void setDateSoutenance(Date dateSoutenance) {
		this.dateSoutenance = dateSoutenance;
	}

	public ModelModule getModule() {
		return module;
	}

	public void setModule(ModelModule module) {
		this.module = module;
	}
	
}
