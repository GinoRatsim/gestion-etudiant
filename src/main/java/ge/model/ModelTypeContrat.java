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
@Table(name = "type_contrat")
public class ModelTypeContrat {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_type_contrat")
	@SequenceGenerator(name = "generator_type_contrat", sequenceName = "_seq_type_contrat")
	private Long idTypeContrat;
	private String libelleTypeContrat;
	
	@OneToMany(mappedBy = "typeContrat", cascade = CascadeType.REMOVE)
	private Set<ModelTypeContrat> typeContrat;
	
	public ModelTypeContrat() {
		super();
	}
	
	public ModelTypeContrat(Long idTypeContrat, String libelleTypeContrat) {
		super();
		this.idTypeContrat = idTypeContrat;
		this.libelleTypeContrat = libelleTypeContrat;
	}

	public Long getIdTypeContrat() {
		return idTypeContrat;
	}

	public void setIdTypeContrat(Long idTypeContrat) {
		this.idTypeContrat = idTypeContrat;
	}

	public String getLibelleTypeContrat() {
		return libelleTypeContrat;
	}

	public void setLibelleTypeContrat(String libelleTypeContrat) {
		this.libelleTypeContrat = libelleTypeContrat;
	}
	
}
