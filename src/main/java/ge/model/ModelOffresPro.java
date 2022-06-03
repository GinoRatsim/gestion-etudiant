package ge.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "offres_pro")
public class ModelOffresPro {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_offres_pro")
	@SequenceGenerator(name = "generator_offres_pro", sequenceName = "_seq_offres_pro")
	private Long idOffresPro;
	@ManyToOne
	@JoinColumn(name = "id_type_contrat", nullable = false)
	private ModelTypeContrat typeContrat;
	private String libelleLong;
	private String description;
	private String fichierOffre;
	@ManyToOne
	@JoinColumn(name = "id_entreprise", nullable = false)
	private ModelEntreprise entreprise;
	
	public ModelOffresPro() {
		super();
	}

	public ModelOffresPro(Long idOffresPro, ModelTypeContrat typeContrat,String libelleLong, String description, String fichierOffre, ModelEntreprise entreprise) {
		super();
		this.idOffresPro = idOffresPro;
		this.typeContrat = typeContrat;
		this.libelleLong = libelleLong;
		this.description = description;
		this.fichierOffre = fichierOffre;
		this.entreprise = entreprise;
	}

	public Long getIdOffresPro() {
		return idOffresPro;
	}

	public void setIdOffresPro(Long idOffresPro) {
		this.idOffresPro = idOffresPro;
	}

	public ModelTypeContrat getTypeContrat() {
		return typeContrat;
	}

	public void setTypeContrat(ModelTypeContrat typeContrat) {
		this.typeContrat = typeContrat;
	}

	public String getLibelleLong() {
		return libelleLong;
	}

	public void setLibelleLong(String libelleLong) {
		this.libelleLong = libelleLong;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getFichierOffre() {
		return fichierOffre;
	}

	public void setFichierOffre(String fichierOffre) {
		this.fichierOffre = fichierOffre;
	}

	public ModelEntreprise getEntreprise() {
		return entreprise;
	}

	public void setEntreprise(ModelEntreprise entreprise) {
		this.entreprise = entreprise;
	}
	
}
