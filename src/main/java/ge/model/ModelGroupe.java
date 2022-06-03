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
@Table(name = "groupe")
public class ModelGroupe {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_groupe")
	@SequenceGenerator(name = "generator_groupe", sequenceName = "_seq_groupe")
	private Long idGroupe;
	private String nomGroupe;
	
	@OneToMany(mappedBy = "groupe", cascade = CascadeType.REMOVE)
	private Set<ModelGroupe> groupe;
	
	public ModelGroupe() {
		super();
	}
	
	public ModelGroupe(Long idGroupe, String nomGroupe) {
		super();
		this.idGroupe = idGroupe;
		this.nomGroupe = nomGroupe;
	}

	public Long getIdGroupe() {
		return idGroupe;
	}

	public void setIdGroupe(Long idGroupe) {
		this.idGroupe = idGroupe;
	}

	public String getNomGroupe() {
		return nomGroupe;
	}

	public void setNomGroupe(String nomGroupe) {
		this.nomGroupe = nomGroupe;
	}
	
}
