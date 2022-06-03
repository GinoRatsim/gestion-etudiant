package ge.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "intervenant")
public class ModelIntervenant {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_intervenant")
	@SequenceGenerator(name = "generator_intervenant", sequenceName = "_seq_intervenant")
	private Long idIntervenant;
	private String libelleIntervenant;
	
	@OneToMany(mappedBy = "intervenant", cascade = CascadeType.REMOVE)
	private Set<ModelIntervenant> intervenant;
	
	public ModelIntervenant() {
		super();
	}

	public ModelIntervenant(Long idIntervenant, String libelleIntervenant) {
		super();
		this.idIntervenant = idIntervenant;
		this.libelleIntervenant = libelleIntervenant;
	}

	public Long getIdIntervenant() {
		return idIntervenant;
	}

	public void setIdIntervenant(Long idIntervenant) {
		this.idIntervenant = idIntervenant;
	}

	public String getLibelleIntervenant() {
		return libelleIntervenant;
	}

	public void setLibelleIntervenant(String libelleIntervenant) {
		this.libelleIntervenant = libelleIntervenant;
	}
	
}
