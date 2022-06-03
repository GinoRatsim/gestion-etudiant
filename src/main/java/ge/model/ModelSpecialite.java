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
@Table(name = "specialite")
public class ModelSpecialite {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_specialite")
	@SequenceGenerator(name = "generator_specialite", sequenceName = "_seq_specialite")
	private Long idSpecialite;
	private String codeSpecialite;
	private String libelleSpecialite;
	
	@OneToMany(mappedBy = "specialite", cascade = CascadeType.REMOVE)
	private Set<ModelSpecialite> specialite;
	
	public ModelSpecialite() {
		super();
	}

	public ModelSpecialite(Long idSpecialite, String codeSpecialite, String libelleSpecialite) {
		super();
		this.idSpecialite = idSpecialite;
		this.codeSpecialite = codeSpecialite;
		this.libelleSpecialite = libelleSpecialite;
	}

	public Long getIdSpecialite() {
		return idSpecialite;
	}

	public void setIdSpecialite(Long idSpecialite) {
		this.idSpecialite = idSpecialite;
	}

	public String getCodeSpecialite() {
		return codeSpecialite;
	}

	public void setCodeSpecialite(String codeSpecialite) {
		this.codeSpecialite = codeSpecialite;
	}

	public String getLibelleSpecialite() {
		return libelleSpecialite;
	}

	public void setLibelleSpecialite(String libelleSpecialite) {
		this.libelleSpecialite = libelleSpecialite;
	}
	
}
