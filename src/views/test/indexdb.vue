<template>
  <div>
    <h2>IndexedDB 完整 CRUD + 范围查询 Demo</h2>

    <!-- 添加用户 -->
    <input v-model="newName" placeholder="输入名字">
    <button @click="addUser">添加用户</button>
    <button @click="getUsers">获取所有用户</button>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.id }} - {{ user.name }}
        <button @click="deleteUser(user.id)">删除</button>
        <button @click="editUser(user)">修改</button>
      </li>
    </ul>

    <!-- 更新输入框 -->
    <div v-if="editingUser">
      <input v-model="editingUser.name" placeholder="修改名字">
      <button @click="updateUser">保存修改</button>
      <button @click="cancelEdit">取消</button>
    </div>

    <!-- 按名字查询 -->
    <div>
      <input v-model="queryName" placeholder="输入名字查询单条">
      <button @click="queryByName">查询</button>
      <div v-if="queriedUser">
        查询结果: {{ queriedUser.id }} - {{ queriedUser.name }}
      </div>
    </div>

    <!-- 范围查询 -->
    <div>
      <input v-model="rangeStart" placeholder="起始字母">
      <input v-model="rangeEnd" placeholder="结束字母">
      <button @click="rangeQuery">范围查询</button>
      <div v-if="rangeUsers.length">
        范围查询结果：
        <ul>
          <li v-for="u in rangeUsers" :key="u.id">{{ u.id }} - {{ u.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      db: null,
      newName: '',
      users: [],
      editingUser: null,
      queryName: '',
      queriedUser: null,
      rangeStart: '',
      rangeEnd: '',
      rangeUsers: []
    }
  },
  created() {
    this.initDB()
  },
  methods: {
    // 初始化数据库
    initDB() {
      const request = window.indexedDB.open('MyDatabase', 1)

      request.onupgradeneeded = (event) => {
        const db = event.target.result
        if (!db.objectStoreNames.contains('users')) {
          const store = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true })
          store.createIndex('name', 'name', { unique: false })
        }
      }

      request.onsuccess = (event) => {
        this.db = event.target.result
        console.log('数据库打开成功', this.db)
      }

      request.onerror = (event) => {
        console.error('数据库打开失败', event)
      }
    },

    // 添加数据
    addUser() {
      if (!this.newName) return alert('请输入名字')
      const transaction = this.db.transaction(['users'], 'readwrite')
      const store = transaction.objectStore('users')
      const request = store.add({ name: this.newName })

      request.onsuccess = () => {
        this.newName = ''
        this.getUsers()
      }

      request.onerror = (event) => {
        console.error('添加失败', event)
      }
    },

    // 获取所有数据
    getUsers() {
      const transaction = this.db.transaction(['users'], 'readonly')
      const store = transaction.objectStore('users')
      const request = store.getAll()

      request.onsuccess = (event) => {
        this.users = event.target.result
      }

      request.onerror = (event) => {
        console.error('查询失败', event)
      }
    },

    // 删除数据
    deleteUser(id) {
      const transaction = this.db.transaction(['users'], 'readwrite')
      const store = transaction.objectStore('users')
      const request = store.delete(id)

      request.onsuccess = () => {
        this.getUsers()
      }

      request.onerror = (event) => {
        console.error('删除失败', event)
      }
    },

    // 编辑数据
    editUser(user) {
      this.editingUser = { ...user }
    },

    // 更新数据
    updateUser() {
      const transaction = this.db.transaction(['users'], 'readwrite')
      const store = transaction.objectStore('users')
      const request = store.put(this.editingUser)

      request.onsuccess = () => {
        this.editingUser = null
        this.getUsers()
      }

      request.onerror = (event) => {
        console.error('更新失败', event)
      }
    },

    cancelEdit() {
      this.editingUser = null
    },

    // 按名字查询单条
    queryByName() {
      if (!this.queryName) return alert('请输入名字')
      const transaction = this.db.transaction(['users'], 'readonly')
      const store = transaction.objectStore('users')
      const index = store.index('name')
      const request = index.get(this.queryName)

      request.onsuccess = (event) => {
        this.queriedUser = event.target.result
        if (!this.queriedUser) alert('未找到匹配用户')
      }

      request.onerror = (event) => {
        console.error('查询失败', event)
      }
    },

    // 范围查询（范围：起始字母到结束字母）
    rangeQuery() {
      if (!this.rangeStart || !this.rangeEnd) return alert('请输入范围')
      const transaction = this.db.transaction(['users'], 'readonly')
      const store = transaction.objectStore('users')
      const index = store.index('name')

      // IDBKeyRange.bound(start, end, [lowerOpen], [upperOpen])
      const range = IDBKeyRange.bound(this.rangeStart, this.rangeEnd)
      const request = index.openCursor(range)

      const result = []
      request.onsuccess = (event) => {
        const cursor = event.target.result
        if (cursor) {
          result.push(cursor.value)
          cursor.continue() // 游标继续
        } else {
          this.rangeUsers = result
        }
      }

      request.onerror = (event) => {
        console.error('范围查询失败', event)
      }
    }
  }
}
</script>
