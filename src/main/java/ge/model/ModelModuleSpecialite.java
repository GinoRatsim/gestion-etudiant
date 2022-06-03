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
@Table(name = "module_specialite")
public class ModelModuleSpecialite {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_module_specialite")
	@SequenceGenerator(name = "generator_module_specialite", sequenceName = "_seq_module_specialite")
	private Long idModuleSpecialite;
	@ManyToOne
	@JoinColumn(name = "id_specialite", nullable = false)
	private ModelSpecialite specialite;
	@ManyToOne
	@JoinColumn(name = "id_module", nullable = false)
	private ModelModule module;
	
	public ModelModuleSpecialite() {
		super();
	}

	public ModelModuleSpecialite(Long idModuleSpecialite, ModelSpecialite specialite, ModelModule module) {
		super();
		this.idModuleSpecialite = idModuleSpecialite;
		this.specialite = specialite;
		this.module = module;
	}

	public Long getIdModuleSpecialite() {
		return idModuleSpecialite;
	}

	public void setIdModuleSpecialite(Long idModuleSpecialite) {
		this.idModuleSpecialite = idModuleSpecialite;
	}

	public ModelSpecialite getSpecialite() {
		return specialite;
	}

	public void setSpecialite(ModelSpecialite specialite) {
		this.specialite = specialite;
	}

	public ModelModule getModule() {
		return module;
	}

	public void setModule(ModelModule module) {
		this.module = module;
	}
	
}
