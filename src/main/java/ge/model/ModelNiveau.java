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
@Table(name = "niveau")
public class ModelNiveau {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_niveau")
	@SequenceGenerator(name = "generator_niveau", sequenceName = "_seq_niveau")
	private Long idNiveau;
	private String codeNiveau;
	private String libelleNiveau;
	
	@OneToMany(mappedBy = "niveau", cascade = CascadeType.REMOVE)
	private Set<ModelNiveau> niveau;
	
	public ModelNiveau() {
		super();
	}
	
	public ModelNiveau(Long idNiveau, String codeNiveau, String libelleNiveau) {
		super();
		this.idNiveau = idNiveau;
		this.codeNiveau = codeNiveau;
		this.libelleNiveau = libelleNiveau;
	}

	public Long getIdNiveau() {
		return idNiveau;
	}

	public void setIdNiveau(Long idNiveau) {
		this.idNiveau = idNiveau;
	}

	public String getCodeNiveau() {
		return codeNiveau;
	}

	public void setCodeNiveau(String codeNiveau) {
		this.codeNiveau = codeNiveau;
	}

	public String getLibelleNiveau() {
		return libelleNiveau;
	}

	public void setLibelleNiveau(String libelleNiveau) {
		this.libelleNiveau = libelleNiveau;
	}
	
}
