const TaskFilters = ({
  search,
  setSearch,
  priorityFilter,
  setPriorityFilter,
  statusFilter,
  setStatusFilter,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <input
        type="text"
        placeholder="Search by title"
        className="border p-2 rounded flex-1"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="ALL">All Priorities</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
        <option value="URGENT">Urgent</option>
      </select>
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="ALL">All Status</option>
        <option value="PENDING">Pending</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
      </select>
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="asc">Due Date ↑</option>
        <option value="desc">Due Date ↓</option>
      </select>
    </div>
  );
};

export default TaskFilters;
