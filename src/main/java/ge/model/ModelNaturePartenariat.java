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
@Table(name = "nature_partenariat")
public class ModelNaturePartenariat {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_nature_partenariat")
	@SequenceGenerator(name = "generator_nature_partenariat", sequenceName = "_seq_nature_partenariat")
	private Long idNaturePartenariat;
	private String libelleNaturePartenariat;
	
	@OneToMany(mappedBy = "naturePartenariat", cascade = CascadeType.REMOVE)
	private Set<ModelNaturePartenariat> naturePartenariat;
	
	public ModelNaturePartenariat() {
		super();
	}

	public ModelNaturePartenariat(Long idNaturePartenariat, String libelleNaturePartenariat) {
		super();
		this.idNaturePartenariat = idNaturePartenariat;
		this.libelleNaturePartenariat = libelleNaturePartenariat;
	}

	public Long getIdNaturePartenariat() {
		return idNaturePartenariat;
	}

	public void setIdNaturePartenariat(Long idNaturePartenariat) {
		this.idNaturePartenariat = idNaturePartenariat;
	}

	public String getLibelleNaturePartenariat() {
		return libelleNaturePartenariat;
	}

	public void setLibelleNaturePartenariat(String libelleNaturePartenariat) {
		this.libelleNaturePartenariat = libelleNaturePartenariat;
	}
	
}
