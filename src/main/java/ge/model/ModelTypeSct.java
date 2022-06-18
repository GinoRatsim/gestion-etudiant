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
@Table(name = "type_sct")
public class ModelTypeSct {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_sct")
	@SequenceGenerator(name = "generator_sct", sequenceName = "_seq_sct")
	private Long idTypeSct;
	private String libelleTypeSct;
	
	@OneToMany(mappedBy = "typeSct", cascade = CascadeType.REMOVE)
	private Set<ModelTypeSct> typeSct;

	public ModelTypeSct() {
		super();
	}

	public ModelTypeSct(Long idTypeSct, String libelleTypeSct) {
		super();
		this.idTypeSct = idTypeSct;
		this.libelleTypeSct = libelleTypeSct;
	}

	public Long getIdTypeSct() {
		return idTypeSct;
	}

	public void setIdTypeSct(Long idTypeSct) {
		this.idTypeSct = idTypeSct;
	}

	public String getLibelleTypeSct() {
		return libelleTypeSct;
	}

	public void setLibelleTypeSct(String libelleTypeSct) {
		this.libelleTypeSct = libelleTypeSct;
	}

}
