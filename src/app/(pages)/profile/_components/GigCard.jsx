'use client';

import Image from 'next/image';
import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {removeJobById} from '@/app/action/service/userApi';
import {useState} from 'react';
import Link from 'next/link';
// import {StarFill} from 'react-bootstrap-icons';

export default function GigCard(props) {
    const {id, congViec} = props || {};
    const [isDeleted, setIsDeleted] = useState(false);

    const {
        tenCongViec,
        danhGia,
        giaTien,
        hinhAnh,
        moTa,
        moTaNgan,
        saoCongViec,
    } = congViec || {};

    const deleteItem = async () => {
        if (confirm('Are you sure you want to delete this item?')) {
            const token = localStorage.getItem('fiverrUserToken');
            if (!token) {
                throw Error('Invalid Token!');
            }
            await removeJobById(token, id);

            setIsDeleted(true);
        }
    };

    if (isDeleted) {
        return null;
    }

    return (
        <Container className="py-4">
            <Card>
                <Row className="g-0">
                    {/* Product Image */}
                    <Col md={4} className="p-3">
                        <div className="position-relative">
                            <Image
                                src={hinhAnh}
                                alt="Product image"
                                width={300}
                                height={300}
                                className="img-fluid rounded"
                            />
                        </div>
                    </Col>

                    {/* Product Details */}
                    <Col md={8}>
                        <Card.Body className="d-flex flex-column h-100">
                            <Card.Title as="h5" className="fs-5 mb-3">
                                {tenCongViec}
                            </Card.Title>

                            <div className="mb-2">{moTaNgan}</div>

                            {/* Rating */}
                            <div className="mb-3 d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <div className="text-warning me-2">
                                        {/* <StarFill /> */}
                                        <span className="ms-1">
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className="icon"
                                            />{' '}
                                            {saoCongViec}
                                        </span>
                                    </div>
                                    <span className="text-muted">
                                        ({danhGia})
                                    </span>
                                </div>

                                <div className="fs-5 fw-bold">${giaTien}</div>
                            </div>

                            {/* Price and Buttons */}
                            <div className="mt-auto d-flex align-items-center justify-content-end">
                                <div>
                                    <Button
                                        as={Link}
                                        variant="success"
                                        href={`/jobDetail/${id}`}
                                        className="me-2">
                                        View detail
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={deleteItem}>
                                        DEL
                                    </Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}
