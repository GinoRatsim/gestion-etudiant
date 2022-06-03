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
	private String code;
	private String libelle;

	@OneToMany(mappedBy = "accesModel", cascade = CascadeType.REMOVE)
	private Set<ModelLogin> loginModel;

	public ModelAcces() {
		super();
	}

	public ModelAcces(Long idAcces, String code, String libelle) {
		super();
		this.idAcces = idAcces;
		this.code = code;
		this.libelle = libelle;
	}

	public Long getIdAcces() {
		return idAcces;
	}

	public void setIdAcces(Long idAcces) {
		this.idAcces = idAcces;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}
		
}
