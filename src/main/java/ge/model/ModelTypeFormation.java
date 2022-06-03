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
@Table(name = "type_formation")
public class ModelTypeFormation {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_type_formation")
	@SequenceGenerator(name = "generator_type_formation", sequenceName = "_seq_type_formation")
	private Long idTypeFormation;
	private String libelleTypeFormation;
	
	@OneToMany(mappedBy = "typeFormation", cascade = CascadeType.REMOVE)
	private Set<ModelTypeFormation> typeFormation;
	
	public ModelTypeFormation() {
		super();
	}

	public ModelTypeFormation(Long idTypeFormation, String libelleTypeFormation) {
		super();
		this.idTypeFormation = idTypeFormation;
		this.libelleTypeFormation = libelleTypeFormation;
	}

	public Long getIdTypeFormation() {
		return idTypeFormation;
	}

	public void setIdTypeFormation(Long idTypeFormation) {
		this.idTypeFormation = idTypeFormation;
	}

	public String getLibelleTypeFormation() {
		return libelleTypeFormation;
	}

	public void setLibelleTypeFormation(String libelleTypeFormation) {
		this.libelleTypeFormation = libelleTypeFormation;
	}
	
}
