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
@Table(name = "login")
public class ModelLogin {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_login")
	@SequenceGenerator(name = "generator_login", sequenceName = "_seq_login")
	private Long idLogin;
	private String user;
	private String pass;

	@ManyToOne
	@JoinColumn(name = "id_acces", nullable = false)
	private ModelAcces accesModel;

	public ModelLogin() {
		super();
	}

	public ModelLogin(Long idLogin, String user, String pass, ModelAcces accesModel) {
		super();
		this.idLogin = idLogin;
		this.user = user;
		this.pass = pass;
		this.accesModel = accesModel;
	}

	public Long getIdLogin() {
		return idLogin;
	}

	public void setIdLogin(Long idLogin) {
		this.idLogin = idLogin;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getPass() {
		return pass;
	}

	public void setPass(String pass) {
		this.pass = pass;
	}

	public ModelAcces getAccesModel() {
		return accesModel;
	}

	public void setAccesModel(ModelAcces accesModel) {
		this.accesModel = accesModel;
	}

}
