package ge.model;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "contrat")
public class ModelContrat {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_contrat")
	@SequenceGenerator(name = "generator_contrat", sequenceName = "_seq_contrat")
	private Long idContrat;
	@ManyToOne
	@JoinColumn(name = "id_entreprise", nullable = false)
	private ModelEntreprise entreprise;
	@ManyToOne
	@JoinColumn(name = "id_type_contrat", nullable = false)
	private ModelTypeContrat typeContrat;
	private double dureeContrat;
	private String nomPrenomEncadreur;
	private String telephoneEncadreur;
	private String adresseEmailEncadreur;
	private Date dateDebutContrat;
	private Date dateFinContrat;
	private String fichierContrat;
	private String fichierConvention;
	
	@OneToMany(mappedBy = "contrat", cascade = CascadeType.REMOVE)
	private Set<ModelContrat> contrat;
	
	public ModelContrat() {
		super();
	}

	public ModelContrat(Long idContrat, ModelEntreprise entreprise, ModelTypeContrat typeContrat, double dureeContrat, String nomPrenomEncadreur, String telephoneEncadreur, String adresseEmailEncadreur, Date dateDebutContrat, Date dateFinContrat, String fichierContrat, String fichierConvention) {
		super();
		this.idContrat = idContrat;
		this.entreprise = entreprise;
		this.typeContrat = typeContrat;
		this.dureeContrat = dureeContrat;
		this.nomPrenomEncadreur = nomPrenomEncadreur;
		this.telephoneEncadreur = telephoneEncadreur;
		this.adresseEmailEncadreur = adresseEmailEncadreur;
		this.dateDebutContrat = dateDebutContrat;
		this.dateFinContrat = dateFinContrat;
		this.fichierContrat = fichierContrat;
		this.fichierConvention = fichierConvention;
	}

	public Long getIdContrat() {
		return idContrat;
	}

	public void setIdContrat(Long idContrat) {
		this.idContrat = idContrat;
	}

	public ModelEntreprise getEntreprise() {
		return entreprise;
	}

	public void setEntreprise(ModelEntreprise entreprise) {
		this.entreprise = entreprise;
	}

	public ModelTypeContrat getTypeContrat() {
		return typeContrat;
	}

	public void setTypeContrat(ModelTypeContrat typeContrat) {
		this.typeContrat = typeContrat;
	}

	public double getDureeContrat() {
		return dureeContrat;
	}

	public void setDureeContrat(double dureeContrat) {
		this.dureeContrat = dureeContrat;
	}

	public String getNomPrenomEncadreur() {
		return nomPrenomEncadreur;
	}

	public void setNomPrenomEncadreur(String nomPrenomEncadreur) {
		this.nomPrenomEncadreur = nomPrenomEncadreur;
	}

	public String getTelephoneEncadreur() {
		return telephoneEncadreur;
	}

	public void setTelephoneEncadreur(String telephoneEncadreur) {
		this.telephoneEncadreur = telephoneEncadreur;
	}

	public String getAdresseEmailEncadreur() {
		return adresseEmailEncadreur;
	}

	public void setAdresseEmailEncadreur(String adresseEmailEncadreur) {
		this.adresseEmailEncadreur = adresseEmailEncadreur;
	}

	public Date getDateDebutContrat() {
		return dateDebutContrat;
	}

	public void setDateDebutContrat(Date dateDebutContrat) {
		this.dateDebutContrat = dateDebutContrat;
	}

	public Date getDateFinContrat() {
		return dateFinContrat;
	}

	public void setDateFinContrat(Date dateFinContrat) {
		this.dateFinContrat = dateFinContrat;
	}

	public String getFichierContrat() {
		return fichierContrat;
	}

	public void setFichierContrat(String fichierContrat) {
		this.fichierContrat = fichierContrat;
	}

	public String getFichierConvention() {
		return fichierConvention;
	}

	public void setFichierConvention(String fichierConvention) {
		this.fichierConvention = fichierConvention;
	}
	
}
