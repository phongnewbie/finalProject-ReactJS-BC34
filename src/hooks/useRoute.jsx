import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
export default function useRoute() {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams, useSearchParams] = useSearchParams();
  return { params, navigate, searchParams: [searchParams, setSearchParams] };
}
