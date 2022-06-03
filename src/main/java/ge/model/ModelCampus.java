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
@Table(name = "campus")
public class ModelCampus {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_campus")
	@SequenceGenerator(name = "generator_campus", sequenceName = "_seq_campus")
	private Long idCampus;
	private String codeCampus;
	private String libelleCampus;
	
	@OneToMany(mappedBy = "campus", cascade = CascadeType.REMOVE)
	private Set<ModelCampus> campus;
	
	public ModelCampus() {
		super();
	}

	public ModelCampus(Long idCampus, String codeCampus, String libelleCampus) {
		super();
		this.idCampus = idCampus;
		this.codeCampus = codeCampus;
		this.libelleCampus = libelleCampus;
	}

	public Long getIdCampus() {
		return idCampus;
	}

	public void setIdCampus(Long idCampus) {
		this.idCampus = idCampus;
	}

	public String getCodeCampus() {
		return codeCampus;
	}

	public void setCodeCampus(String codeCampus) {
		this.codeCampus = codeCampus;
	}

	public String getLibelleCampus() {
		return libelleCampus;
	}

	public void setLibelleCampus(String libelleCampus) {
		this.libelleCampus = libelleCampus;
	}
	
}
