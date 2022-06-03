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
@Table(name = "entreprise")
public class ModelEntreprise {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_entreprise")
	@SequenceGenerator(name = "generator_entreprise", sequenceName = "_seq_entreprise")
	private Long idEntreprise;
	private String nomEntreprise;
	private String secteurActiviteEntreprise;
	private String adresseEntreprise;
	private String codePostalEntreprise;
	private String villeEntreprise;
	private String telephoneEntreprise;
	private String responsableEntreprise;
	private String mailEntreprise;
	
	@OneToMany(mappedBy = "entreprise", cascade = CascadeType.REMOVE)
	private Set<ModelEntreprise> entreprise;
	
	public ModelEntreprise() {
		super();
	}

	public ModelEntreprise(Long idEntreprise, String nomEntreprise, String secteurActiviteEntreprise, String adresseEntreprise, String codePostalEntreprise, String villeEntreprise, String telephoneEntreprise, String responsableEntreprise, String mailEntreprise) {
		super();
		this.idEntreprise = idEntreprise;
		this.nomEntreprise = nomEntreprise;
		this.secteurActiviteEntreprise = secteurActiviteEntreprise;
		this.adresseEntreprise = adresseEntreprise;
		this.codePostalEntreprise = codePostalEntreprise;
		this.villeEntreprise = villeEntreprise;
		this.telephoneEntreprise = telephoneEntreprise;
		this.responsableEntreprise = responsableEntreprise;
		this.mailEntreprise = mailEntreprise;
	}

	public Long getIdEntreprise() {
		return idEntreprise;
	}

	public void setIdEntreprise(Long idEntreprise) {
		this.idEntreprise = idEntreprise;
	}

	public String getNomEntreprise() {
		return nomEntreprise;
	}

	public void setNomEntreprise(String nomEntreprise) {
		this.nomEntreprise = nomEntreprise;
	}

	public String getSecteurActiviteEntreprise() {
		return secteurActiviteEntreprise;
	}

	public void setSecteurActiviteEntreprise(String secteurActiviteEntreprise) {
		this.secteurActiviteEntreprise = secteurActiviteEntreprise;
	}

	public String getAdresseEntreprise() {
		return adresseEntreprise;
	}

	public void setAdresseEntreprise(String adresseEntreprise) {
		this.adresseEntreprise = adresseEntreprise;
	}

	public String getCodePostalEntreprise() {
		return codePostalEntreprise;
	}

	public void setCodePostalEntreprise(String codePostalEntreprise) {
		this.codePostalEntreprise = codePostalEntreprise;
	}

	public String getVilleEntreprise() {
		return villeEntreprise;
	}

	public void setVilleEntreprise(String villeEntreprise) {
		this.villeEntreprise = villeEntreprise;
	}

	public String getTelephoneEntreprise() {
		return telephoneEntreprise;
	}

	public void setTelephoneEntreprise(String telephoneEntreprise) {
		this.telephoneEntreprise = telephoneEntreprise;
	}

	public String getResponsableEntreprise() {
		return responsableEntreprise;
	}

	public void setResponsableEntreprise(String responsableEntreprise) {
		this.responsableEntreprise = responsableEntreprise;
	}

	public String getMailEntreprise() {
		return mailEntreprise;
	}

	public void setMailEntreprise(String mailEntreprise) {
		this.mailEntreprise = mailEntreprise;
	}
	
}
