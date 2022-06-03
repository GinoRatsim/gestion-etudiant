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
@Table(name = "groupe_module")
public class ModelGroupeModule {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_groupe_module")
	@SequenceGenerator(name = "generator_groupe_module", sequenceName = "_seq_groupe_module")
	private Long idGroupeModule;
	@ManyToOne
	@JoinColumn(name = "id_module", nullable = false)
	private ModelModule module;
	@ManyToOne
	@JoinColumn(name = "id_etudiant", nullable = false)
	private ModelEtudiant etudiant;
	@ManyToOne
	@JoinColumn(name = "id_campus", nullable = false)
	private ModelCampus campus;
	@ManyToOne
	@JoinColumn(name = "id_groupe", nullable = false)
	private ModelGroupe groupe;
	
	public ModelGroupeModule() {
		super();
	}

	public ModelGroupeModule(Long idGroupeModule, ModelModule module, ModelEtudiant etudiant, ModelCampus campus, ModelGroupe groupe) {
		super();
		this.idGroupeModule = idGroupeModule;
		this.module = module;
		this.etudiant = etudiant;
		this.campus = campus;
		this.groupe = groupe;
	}

	public Long getIdGroupeModule() {
		return idGroupeModule;
	}

	public void setIdGroupeModule(Long idGroupeModule) {
		this.idGroupeModule = idGroupeModule;
	}

	public ModelModule getModule() {
		return module;
	}

	public void setModule(ModelModule module) {
		this.module = module;
	}

	public ModelEtudiant getEtudiant() {
		return etudiant;
	}

	public void setEtudiant(ModelEtudiant etudiant) {
		this.etudiant = etudiant;
	}

	public ModelCampus getCampus() {
		return campus;
	}

	public void setCampus(ModelCampus campus) {
		this.campus = campus;
	}

	public ModelGroupe getGroupe() {
		return groupe;
	}

	public void setGroupe(ModelGroupe groupe) {
		this.groupe = groupe;
	}
	
}
