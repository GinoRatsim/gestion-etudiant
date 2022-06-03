package ge.model;

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
@Table(name = "module")
public class ModelModule {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_module")
	@SequenceGenerator(name = "generator_module", sequenceName = "_seq_module")
	private Long idModule;
	@ManyToOne
	@JoinColumn(name = "id_niveau", nullable = false)
	private ModelNiveau niveau;
	private String codeModule;
	private String libelleModule;
	private int estObligatoire;
	private double creditRequis;
	
	@OneToMany(mappedBy = "module", cascade = CascadeType.REMOVE)
	private Set<ModelModule> module;
	
	public ModelModule() {
		super();
	}

	public ModelModule(Long idModule, ModelNiveau niveau, String codeModule, String libelleModule, int estObligatoire, double creditRequis) {
		super();
		this.idModule = idModule;
		this.niveau = niveau;
		this.codeModule = codeModule;
		this.libelleModule = libelleModule;
		this.estObligatoire = estObligatoire;
		this.creditRequis = creditRequis;
	}

	public Long getIdModule() {
		return idModule;
	}

	public void setIdModule(Long idModule) {
		this.idModule = idModule;
	}

	public ModelNiveau getNiveau() {
		return niveau;
	}

	public void setNiveau(ModelNiveau niveau) {
		this.niveau = niveau;
	}

	public String getCodeModule() {
		return codeModule;
	}

	public void setCodeModule(String codeModule) {
		this.codeModule = codeModule;
	}

	public String getLibelleModule() {
		return libelleModule;
	}

	public void setLibelleModule(String libelleModule) {
		this.libelleModule = libelleModule;
	}

	public int getEstObligatoire() {
		return estObligatoire;
	}

	public void setEstObligatoire(int estObligatoire) {
		this.estObligatoire = estObligatoire;
	}

	public double getCreditRequis() {
		return creditRequis;
	}

	public void setCreditRequis(double creditRequis) {
		this.creditRequis = creditRequis;
	}
	
}
