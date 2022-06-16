package ge.model;

public class ModelPL {

	private ModelPersonne personne;
	private ModelLogin login;
	
	public ModelPL() {
		super();
	}

	public ModelPL(ModelPersonne personne, ModelLogin login) {
		super();
		this.personne = personne;
		this.login = login;
	}

	public ModelPersonne getPersonne() {
		return personne;
	}

	public void setPersonne(ModelPersonne personne) {
		this.personne = personne;
	}

	public ModelLogin getLogin() {
		return login;
	}

	public void setLogin(ModelLogin login) {
		this.login = login;
	}
	
}
