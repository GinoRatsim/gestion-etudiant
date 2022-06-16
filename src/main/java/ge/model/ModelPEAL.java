package ge.model;

public class ModelPEAL {

	private ModelPersonne personne;
	private ModelEtudiant etudiant;
	private ModelAdresse adresse;
	private ModelLogin login;
	
	public ModelPEAL() {
		super();
	}

	public ModelPEAL(ModelPersonne personne, ModelEtudiant etudiant, ModelAdresse adresse, ModelLogin login) {
		super();
		this.personne = personne;
		this.etudiant = etudiant;
		this.adresse = adresse;
		this.login = login;
	}

	public ModelPersonne getPersonne() {
		return personne;
	}

	public void setPersonne(ModelPersonne personne) {
		this.personne = personne;
	}

	public ModelEtudiant getEtudiant() {
		return etudiant;
	}

	public void setEtudiant(ModelEtudiant etudiant) {
		this.etudiant = etudiant;
	}

	public ModelAdresse getAdresse() {
		return adresse;
	}

	public void setAdresse(ModelAdresse adresse) {
		this.adresse = adresse;
	}

	public ModelLogin getLogin() {
		return login;
	}

	public void setLogin(ModelLogin login) {
		this.login = login;
	}
	
}
