#!/bin/bash
echo "Starting Integration Tests..."
# 1. Test Auth
echo "Testing Auth (Signup)..."
SIGNUP_RES=$(curl -s -X POST "http://localhost:9999/signup" -H "Content-Type: application/json" -d '{"email": "test_'$(date +%s)'@example.com", "password": "password123"}')
if echo "$SIGNUP_RES" | grep -q "access_token"; then
  echo "Auth Signup PASSED"
  TOKEN=$(echo "$SIGNUP_RES" | jq -r .access_token)
else
  echo "Auth Signup FAILED"
  echo "$SIGNUP_RES"
  return 1 2>/dev/null
fi
# 2. Test REST API
echo "Testing REST API (GET /items)..."
REST_RES=$(curl -s -H "Authorization: Bearer $TOKEN" "http://localhost:3000/items")
if echo "$REST_RES" | grep -q "Item 1"; then
  echo "REST API PASSED"
else
  echo "REST API FAILED"
  echo "$REST_RES"
  return 1 2>/dev/null
fi
# 3. Test Storage
echo "Testing Storage (Upload)..."
echo "test content" > test_upload.txt
STORAGE_RES=$(curl -s -X POST "http://localhost:5001/upload" -H "Authorization: Bearer $TOKEN" -F "file=@test_upload.txt")
if echo "$STORAGE_RES" | grep -q "key"; then
  echo "Storage Upload PASSED"
else
  echo "Storage Upload FAILED"
  echo "$STORAGE_RES"
  return 1 2>/dev/null
fi
# 4. Test Edge Functions
echo "Testing Edge Functions (Invoke hello)..."
FUNC_RES=$(curl -s -X POST "http://localhost:5002/invoke/hello" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"name": "Tester"}')
if echo "$FUNC_RES" | grep -q "Hello Tester"; then
  echo "Edge Functions PASSED"
else
  echo "Edge Functions FAILED"
  echo "$FUNC_RES"
  return 1 2>/dev/null
fi
echo "ALL TESTS PASSED!"
