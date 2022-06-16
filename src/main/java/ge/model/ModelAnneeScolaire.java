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
@Table(name = "annee_scolaire")
public class ModelAnneeScolaire {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_anneeScolaire")
	@SequenceGenerator(name = "generator_anneeScolaire", sequenceName = "_seq_anneeScolaire")
	private Long idAnneeScolaire;
	private String annee;
	
	@OneToMany(mappedBy = "anneeScolaire", cascade = CascadeType.REMOVE)
	private Set<ModelAnneeScolaire> anneeScolaire;

	public ModelAnneeScolaire() {
		super();
	}

	public ModelAnneeScolaire(Long idAnneeScolaire, String annee) {
		super();
		this.idAnneeScolaire = idAnneeScolaire;
		this.annee = annee;
	}

	public Long getIdAnneeScolaire() {
		return idAnneeScolaire;
	}

	public void setIdAnneeScolaire(Long idAnneeScolaire) {
		this.idAnneeScolaire = idAnneeScolaire;
	}

	public String getAnnee() {
		return annee;
	}

	public void setAnnee(String annee) {
		this.annee = annee;
	}
	
}
