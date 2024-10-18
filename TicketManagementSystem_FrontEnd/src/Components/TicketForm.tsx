import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { createTicket, updateTicket } from "../Services/ticketService";
import { Ticket, TicketStatus } from "../types/Ticket";

interface TicketFormProps {
  ticket?: Ticket | null;
  onClose: () => void;
}

const TicketForm: React.FC<TicketFormProps> = ({ ticket, onClose }) => {
  const [formData, setFormData] = useState<Ticket>({
    description: "",
    status: TicketStatus.Open,
    id: 0,
    date: new Date().toISOString(),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    if (ticket) {
      setFormData(ticket);
    }
  }, [ticket]);

  const getEnumValues = (enumObj: typeof TicketStatus) => {
    return Object.entries(enumObj)
      .filter(([key, value]) => !isNaN(Number(value)))
      .map(([key, value]) => ({
        value: Number(value),
        label: key,
      }));
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "status" ? Number(value) : value,
    });
    setValidationErrors({});
  };

  const validate = () => {
    const errors: { [key: string]: string } = {};

    if (formData.description.trim().length === 0) {
      errors.description = "Description is required.";
    }

    if (!formData.date) {
      errors.date = "Date is required.";
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const errors = validate();
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    try {
      if (ticket) {
        await updateTicket(ticket.id, formData);
      } else {
        await createTicket(formData);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusOptions = getEnumValues(TicketStatus);

  return (
    <Form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}

      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          isInvalid={!!validationErrors.description}
          disabled={isSubmitting}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.description}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDate">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={formData.date.split("T")[0]}
          onChange={handleChange}
          isInvalid={!!validationErrors.date}
          disabled={isSubmitting}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.date}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formStatus">
        <Form.Label>Status</Form.Label>
        <Form.Select
          name="status"
          value={formData.status}
          onChange={handleChange}
          disabled={isSubmitting}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <div className="d-flex gap-2">
        <Button type="submit" variant="success" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : ticket ? "Update" : "Create"}
        </Button>
        <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default TicketForm;
