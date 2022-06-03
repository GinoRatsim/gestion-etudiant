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
@Table(name = "adresse")
public class ModelAdresse {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_adresse")
	@SequenceGenerator(name = "generator_adresse", sequenceName = "_seq_adresse")
	private Long idAdresse;
	@ManyToOne
	@JoinColumn(name = "id_personne", nullable = false)
	private ModelPersonne personne;
	private String numTelephonePerso;
	private String numTelephoneSupinfo;
	private String adresseEmailPerso;
	private String adresseEmailSupinfo;
	private String region;
	private String libelleAdresse;
	private String codePostal;
	private String ville;
	private int actuel;
	
	public ModelAdresse() {
		super();
	}

	public ModelAdresse(Long idAdresse, ModelPersonne personne, String numTelephonePerso, String numTelephoneSupinfo, String adresseEmailPerso, String adresseEmailSupinfo, String region, String libelleAdresse, String codePostal, String ville, int actuel) {
		super();
		this.idAdresse = idAdresse;
		this.personne = personne;
		this.numTelephonePerso = numTelephonePerso;
		this.numTelephoneSupinfo = numTelephoneSupinfo;
		this.adresseEmailPerso = adresseEmailPerso;
		this.adresseEmailSupinfo = adresseEmailSupinfo;
		this.region = region;
		this.libelleAdresse = libelleAdresse;
		this.codePostal = codePostal;
		this.ville = ville;
		this.actuel = actuel;
	}

	public Long getIdAdresse() {
		return idAdresse;
	}

	public void setIdAdresse(Long idAdresse) {
		this.idAdresse = idAdresse;
	}

	public ModelPersonne getPersonne() {
		return personne;
	}

	public void setPersonne(ModelPersonne personne) {
		this.personne = personne;
	}

	public String getNumTelephonePerso() {
		return numTelephonePerso;
	}

	public void setNumTelephonePerso(String numTelephonePerso) {
		this.numTelephonePerso = numTelephonePerso;
	}

	public String getNumTelephoneSupinfo() {
		return numTelephoneSupinfo;
	}

	public void setNumTelephoneSupinfo(String numTelephoneSupinfo) {
		this.numTelephoneSupinfo = numTelephoneSupinfo;
	}

	public String getAdresseEmailPerso() {
		return adresseEmailPerso;
	}

	public void setAdresseEmailPerso(String adresseEmailPerso) {
		this.adresseEmailPerso = adresseEmailPerso;
	}

	public String getAdresseEmailSupinfo() {
		return adresseEmailSupinfo;
	}

	public void setAdresseEmailSupinfo(String adresseEmailSupinfo) {
		this.adresseEmailSupinfo = adresseEmailSupinfo;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getLibelleAdresse() {
		return libelleAdresse;
	}

	public void setLibelleAdresse(String libelleAdresse) {
		this.libelleAdresse = libelleAdresse;
	}

	public String getCodePostal() {
		return codePostal;
	}

	public void setCodePostal(String codePostal) {
		this.codePostal = codePostal;
	}

	public String getVille() {
		return ville;
	}

	public void setVille(String ville) {
		this.ville = ville;
	}

	public int getActuel() {
		return actuel;
	}

	public void setActuel(int actuel) {
		this.actuel = actuel;
	}
	
}
