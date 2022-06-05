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
@Table(name = "acces")
public class ModelAcces {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_acces")
	@SequenceGenerator(name = "generator_acces", sequenceName = "_seq_acces")
	private Long idAcces;
	private String codeAcces;
	private String libelleAcces;

	@OneToMany(mappedBy = "accesModel", cascade = CascadeType.REMOVE)
	private Set<ModelLogin> loginModel;

	public ModelAcces() {
		super();
	}

	public ModelAcces(Long idAcces, String codeAcces, String libelleAcces) {
		super();
		this.idAcces = idAcces;
		this.codeAcces = codeAcces;
		this.libelleAcces = libelleAcces;
	}

	public Long getIdAcces() {
		return idAcces;
	}

	public void setIdAcces(Long idAcces) {
		this.idAcces = idAcces;
	}

	public String getCodeAcces() {
		return codeAcces;
	}

	public void setCodeAcces(String codeAcces) {
		this.codeAcces = codeAcces;
	}

	public String getLibelleAcces() {
		return libelleAcces;
	}

	public void setLibelleAcces(String libelleAcces) {
		this.libelleAcces = libelleAcces;
	}
		
}
