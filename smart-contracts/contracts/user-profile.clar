;; user-profile.clar
(define-map users principal { username: (string-ascii 30), bio: (string-utf8 160) })

(define-public (create-profile (username (string-ascii 30)) (bio (string-utf8 160)))
  (begin
    (asserts! (is-none (map-get? users tx-sender)) (err u100)) ;; Ensure the user does not already have a profile
    (asserts! (> (len username) u0) (err u101)) ;; Ensure username is not empty
    (asserts! (> (len bio) u0) (err u102)) ;; Ensure bio is not empty
    (ok (map-set users tx-sender { username: username, bio: bio }))
  ))

(define-read-only (get-profile (user principal))
  (ok (map-get? users user)))