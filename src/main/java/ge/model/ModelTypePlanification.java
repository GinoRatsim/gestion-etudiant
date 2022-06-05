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
@Table(name = "type_planification")
public class ModelTypePlanification {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_type_planification")
	@SequenceGenerator(name = "generator_type_planification", sequenceName = "_seq_type_planification")
	private Long idTypePlanification;
	private String libelleTypePlanification;
	
	@OneToMany(mappedBy = "typePlanification", cascade = CascadeType.REMOVE)
	private Set<ModelTypePlanification> typePlanification;
	
	public ModelTypePlanification() {
		super();
	}
	
	public ModelTypePlanification(Long idTypePlanification, String libelleTypePlanification) {
		super();
		this.idTypePlanification = idTypePlanification;
		this.libelleTypePlanification = libelleTypePlanification;
	}

	public Long getIdTypePlanification() {
		return idTypePlanification;
	}

	public void setIdTypePlanification(Long idTypePlanification) {
		this.idTypePlanification = idTypePlanification;
	}

	public String getLibelleTypePlanification() {
		return libelleTypePlanification;
	}

	public void setLibelleTypePlanification(String libelleTypePlanification) {
		this.libelleTypePlanification = libelleTypePlanification;
	}
	
	
}
