package ge.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "partenariats")
public class ModelPartenariats {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_partenariats")
	@SequenceGenerator(name = "generator_partenariats", sequenceName = "_seq_partenariats")
	private Long idPartenariats;
	@ManyToOne
	@JoinColumn(name = "id_nature_partenariat", nullable = false)
	private ModelNaturePartenariat naturePartenariat;
	private String libellePartenariatCourte;
	private String libellePartenariatLong;
	private String description;
	private Date dateDebutPartenariat;
	private Date dateFinPartenariat;
	
	public ModelPartenariats() {
		super();
	}

	public ModelPartenariats(Long idPartenariats, ModelNaturePartenariat naturePartenariat, String libellePartenariatCourte, String libellePartenariatLong, String description, Date dateDebutPartenariat, Date dateFinPartenariat) {
		super();
		this.idPartenariats = idPartenariats;
		this.naturePartenariat = naturePartenariat;
		this.libellePartenariatCourte = libellePartenariatCourte;
		this.libellePartenariatLong = libellePartenariatLong;
		this.description = description;
		this.dateDebutPartenariat = dateDebutPartenariat;
		this.dateFinPartenariat = dateFinPartenariat;
	}

	public Long getIdPartenariats() {
		return idPartenariats;
	}

	public void setIdPartenariats(Long idPartenariats) {
		this.idPartenariats = idPartenariats;
	}

	public ModelNaturePartenariat getNaturePartenariat() {
		return naturePartenariat;
	}

	public void setNaturePartenariat(ModelNaturePartenariat naturePartenariat) {
		this.naturePartenariat = naturePartenariat;
	}

	public String getLibellePartenariatCourte() {
		return libellePartenariatCourte;
	}

	public void setLibellePartenariatCourte(String libellePartenariatCourte) {
		this.libellePartenariatCourte = libellePartenariatCourte;
	}

	public String getLibellePartenariatLong() {
		return libellePartenariatLong;
	}

	public void setLibellePartenariatLong(String libellePartenariatLong) {
		this.libellePartenariatLong = libellePartenariatLong;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getDateDebutPartenariat() {
		return dateDebutPartenariat;
	}

	public void setDateDebutPartenariat(Date dateDebutPartenariat) {
		this.dateDebutPartenariat = dateDebutPartenariat;
	}

	public Date getDateFinPartenariat() {
		return dateFinPartenariat;
	}

	public void setDateFinPartenariat(Date dateFinPartenariat) {
		this.dateFinPartenariat = dateFinPartenariat;
	}
	
}
