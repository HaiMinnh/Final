import {updateUserInfoApi} from '@/app/action/service/userApi';
import {useRouter} from 'next/navigation';
import React, {useState} from 'react';
import {Form, Button, Container, Row, Col, Badge} from 'react-bootstrap';

function TagInput({label, tags, onAddTag, onRemoveTag}) {
    const [input, setInput] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (input.trim()) {
                onAddTag(input.trim());
                setInput('');
            }
        }
    };

    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Add ${label.toLowerCase()}`}
            />
            <div className="mt-2">
                {tags.map((tag) => (
                    <Badge
                        key={tag}
                        bg="light"
                        text="dark"
                        className="me-2 mb-2 p-2"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                        }}>
                        {tag}

                        <button onClick={() => onRemoveTag(tag)}>X</button>
                    </Badge>
                ))}
            </div>
        </Form.Group>
    );
}

export default function UpdateUserForm({setModalShow, user = {}, setUser}) {
    const [formData, setFormData] = useState({
        ...user,
        gender: user.gender ? 'male' : 'female',
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleAddTag = (field, tag) => {
        setFormData((prev) => ({
            ...prev,
            [field]: [...prev[field], tag],
        }));
    };

    const handleRemoveTag = (field, tagToRemove) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].filter((tag) => tag !== tagToRemove),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Handle form submission here
        const updatedUser = await updateUserInfoApi(user.id, {
            ...formData,
            gender: formData.gender === 'male' ? true : false,
        });

        if (updatedUser) {
            setModalShow(false);
            alert('Cập nhật thông tin thành công!');
            window.location.reload();
        }
    };

    return (
        <Container className="py-5">
            <h1 className="text-center mb-4">Update User</h1>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control
                                type="date"
                                name="birthday"
                                value={formData.birthday}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <div>
                        <Form.Check
                            inline
                            type="radio"
                            label="Male"
                            name="gender"
                            value={'male'}
                            checked={formData.gender === 'male'}
                            onChange={handleInputChange}
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="Female"
                            name="gender"
                            value={'female'}
                            checked={formData.gender === 'female'}
                            onChange={handleInputChange}
                        />
                    </div>
                </Form.Group>

                <TagInput
                    label="Certification"
                    tags={formData.certification}
                    onAddTag={(tag) => handleAddTag('certification', tag)}
                    onRemoveTag={(tag) => handleRemoveTag('certification', tag)}
                />

                <TagInput
                    label="Skill"
                    tags={formData.skill}
                    onAddTag={(tag) => handleAddTag('skill', tag)}
                    onRemoveTag={(tag) => handleRemoveTag('skill', tag)}
                />

                <div className="d-flex justify-content-end gap-2 mt-4">
                    <Button
                        variant="danger"
                        onClick={() => setModalShow(false)}>
                        CANCEL
                    </Button>
                    <Button variant="success" type="submit">
                        SAVE
                    </Button>
                </div>
            </Form>
        </Container>
    );
}
