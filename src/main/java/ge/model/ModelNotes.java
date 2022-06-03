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
@Table(name = "notes")
public class ModelNotes {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_notes")
	@SequenceGenerator(name = "generator_notes", sequenceName = "_seq_notes")
	private Long idNotes;
	@ManyToOne
	@JoinColumn(name = "id_etudiant", nullable = false)
	private ModelEtudiant etudiant;
	@ManyToOne
	@JoinColumn(name = "id_module", nullable = false)
	private ModelModule module;
	private double notes;
	
	public ModelNotes() {
		super();
	}

	public ModelNotes(Long idNotes, ModelEtudiant etudiant, ModelModule module, double notes) {
		super();
		this.idNotes = idNotes;
		this.etudiant = etudiant;
		this.module = module;
		this.notes = notes;
	}

	public Long getIdNotes() {
		return idNotes;
	}

	public void setIdNotes(Long idNotes) {
		this.idNotes = idNotes;
	}

	public ModelEtudiant getEtudiant() {
		return etudiant;
	}

	public void setEtudiant(ModelEtudiant etudiant) {
		this.etudiant = etudiant;
	}

	public ModelModule getModule() {
		return module;
	}

	public void setModule(ModelModule module) {
		this.module = module;
	}

	public double getNotes() {
		return notes;
	}

	public void setNotes(double notes) {
		this.notes = notes;
	}
	
}
