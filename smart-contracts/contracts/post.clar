;; Define the post structure
(define-map posts uint 
  { 
    author: principal, 
    content: (string-utf8 280), 
    timestamp: uint,
    likes: uint
  }
)

;; Define a data var to keep track of the total number of posts
(define-data-var post-count uint u0)

;; Function to create a new post
(define-public (create-post (content (string-utf8 280)))
  (let 
    (
      (post-id (+ (var-get post-count) u1))
    )
    (map-set posts post-id
      { 
        author: tx-sender, 
        content: content, 
        timestamp: block-height,
        likes: u0
      }
    )
    (var-set post-count post-id)
    (ok post-id)
  )
)

;; Function to get a post by ID
(define-read-only (get-post (post-id uint))
  (ok (map-get? posts post-id))
)

;; Function to like a post
(define-public (like-post (post-id uint))
  (let 
    (
      (post (map-get? posts post-id))
    )
    (if (is-some post)
      (let 
        (
          (new-likes (+ (get likes post) u1))
        )
        (map-set posts post-id 
          (merge post { likes: new-likes })
        )
        (ok true)
      )
      (err u404)
    )
  )
)

;; Helper function to collect posts in a range
(define-read-only (collect-posts (start uint) (end uint) (acc (list 100)))
  (if (>= start end)
    (ok acc)
    (let
      (
        (post (map-get? posts start))
      )
      (if (is-some post)
        (collect-posts (+ start u1) end (cons post acc))
        (collect-posts (+ start u1) end acc)
      )
    )
  )
)

;; Function to get all posts (limited to last 50 for efficiency)
(define-read-only (get-all-posts)
  (let
    (
      (total (var-get post-count))
      (start (if (> total u50) (- total u50 u1) u0))
      (posts-list (list))
    )
    (while (< start total)
      (let
        (
          (post (map-get? posts start))
        )
        (if (is-some post)
          (set posts-list (cons post posts-list))
          (noop)
        )
        (set start (+ start u1))
      )
    )
    (ok posts-list)
  )
)

